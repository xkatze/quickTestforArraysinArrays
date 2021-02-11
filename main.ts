import "./polyfills";

import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DemoMaterialModule } from "./material-module";
import { CommonModule } from "@angular/common";

import { TableSortingExample } from "./app/table-sorting-example";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule
  ],
  entryComponents: [TableSortingExample],
  declarations: [TableSortingExample],
  bootstrap: [TableSortingExample],
  providers: []
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
