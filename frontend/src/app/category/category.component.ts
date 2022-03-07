import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import CATEGORY_ARTICLES_QUERY from '../apollo/queries/category/articles';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, map, tap } from 'rxjs';

export interface Articles {
  id: number;
  title: string;
  content: string;
  category: string;
  image: string;
  AltText: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  data: Articles[] = [];
  category = '';
  leftArticles: Articles[] = [];
  rightArticles: Articles[] = [];

  private queryCategoriesArticles: Subscription = new Subscription();

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.queryCategoriesArticles = this.apollo
        .watchQuery({
          query: CATEGORY_ARTICLES_QUERY,
          variables: {
            id: params.get('id'),
          },
        })
        .valueChanges.pipe(
          map((result: any) => ({
            category: result.data.category.data.attributes.category as string,
            articles: result.data.category.data.attributes.articles.data.map(
              (article: any) => ({
                id: article.id,
                category: article.attributes.category.data.attributes.category,
                content: article.attributes.content,
                title: article.attributes.title,
                image: article.attributes.image.data.attributes.url,
                AltText:
                  article.attributes.image.data.attributes.alternativeText,
              })
            ) as Articles[],
          }))
        )
        .subscribe(({ articles, category }) => {
          this.data = articles;
          this.category = category;
          const leftArticlesCount = Math.ceil(articles.length / 5);
          this.leftArticles = articles.slice(0, leftArticlesCount);
          this.rightArticles = articles.slice(
            leftArticlesCount,
            articles.length
          );
        });
    });
  }
  ngOnDestroy() {
    this.queryCategoriesArticles.unsubscribe();
  }
}
