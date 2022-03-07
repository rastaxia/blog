import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import ARTICLE_QUERY from '../apollo/queries/article/article';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, tap } from 'rxjs';

export interface Article {
  id: number;
  title: string;
  content: string;
  written: string;
  image: string;
  AltText: string;
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  data: any = {};
  loading = true;
  errors: any;
  article?: Article;

  private queryArticle: Subscription = new Subscription();

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit() {
    this.queryArticle = this.apollo
      .watchQuery({
        query: ARTICLE_QUERY,
        variables: {
          id: this.route.snapshot.paramMap.get('id'),
        },
      })
      .valueChanges.pipe(
        // tap(console.log),
        map((result: any): Article => {
          const article = result.data.article.data;
          return {
            id: article.id,
            title: article.attributes.title,
            content: article.attributes.content,
            image: article.attributes.image.data.attributes.url,
            AltText: article.attributes.image.data.attributes.alternativeText,
            written: article.attributes.written,
          };
        })
        // ,tap(console.log)
      )
      .subscribe((article: Article) => {
        this.article = article;
      });
  }
  ngOnDestroy() {
    this.queryArticle.unsubscribe();
  }
}
