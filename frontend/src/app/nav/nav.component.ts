import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import CATEGORIES_QUERY from '../apollo/queries/category/categories';
import { map, Subscription, tap } from 'rxjs';

export interface Category {
  id: number;
  category: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  data: any = {};
  loading = true;
  errors: any;
  category: Category[] = [];

  private queryCategories: Subscription = new Subscription();

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.queryCategories = this.apollo
      .watchQuery({
        query: CATEGORIES_QUERY,
      })
      .valueChanges.pipe(
        tap(console.log),
        map((result: any) =>
          result.data.categories.data.map((category: any) => ({
            id: category.id,
            category: category.attributes.category,
          }))
        ),
        tap(console.log)
      )
      .subscribe((category: Category[]) => {
        this.category = category;
      });
  }
  ngOnDestroy() {
    this.queryCategories.unsubscribe;
  }
}
