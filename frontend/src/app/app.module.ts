import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ArticlesComponent } from './articles/articles.component';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryComponent } from './category/category.component';

const appRoutes: Routes = [
  { path: '', component: ArticlesComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'category/:id', component: CategoryComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ArticlesComponent,
    ArticleComponent,
    CategoryComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule,
    ApolloModule,
    HttpClientModule,
    AppRoutingModule,
    MarkdownModule.forRoot(),
  ],

  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:1337/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
