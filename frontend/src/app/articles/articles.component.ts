import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import ARTICLES_QUERY from "../apollo/queries/article/articles";
import { map, Subscription } from "rxjs";

export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  image: string;
}

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.css"]
})
export class ArticlesComponent implements OnInit {
  data: any = {};
  loading = true;
  errors: any;
  leftArticlesCount: any;
  leftArticles: Article[] = [];
  rightArticles: Article[] = [];

  private queryArticles: Subscription = new Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.queryArticles = this.apollo
      .watchQuery({
        query: ARTICLES_QUERY
      })
      .valueChanges.pipe(
        map((result: any) => result.data.articles.data.map((article: any) => ({
          id: article.id,
          title: article.attributes.title,
          image: article.attributes.image.data.attributes.url,
          content: article.attributes.content,

          category: article.attributes.category.data.attributes.category,
        })))
      ).subscribe((articles: Article[]) => {
        this.leftArticlesCount = Math.ceil(articles.length / 5);
        this.leftArticles = articles.slice(0, this.leftArticlesCount);
        this.rightArticles = articles.slice(
          this.leftArticlesCount,
          articles.length
        );
      });
  }

  ngOnDestroy() {
    this.queryArticles.unsubscribe();
  }
}