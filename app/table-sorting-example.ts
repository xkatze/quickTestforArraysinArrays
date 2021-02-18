import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from "@angular/cdk/collections";

export interface Zoneman{
  zonename: string,
       department: [{
        departmentname: string, 
        wards: [
          {wardsname: string,
            ipads: [
              {nr: number}
            ]}
        ]}
      ]
}

@Component({
  selector: 'table-sorting-example',
  styleUrls: ['table-sorting-example.css'],
  templateUrl: 'table-sorting-example.html',
})
export class TableSortingExample implements OnInit {
  displayedColumns: string[] = ['_id', 'name'];
  displayedColumns2: string[] = ['zonename', 'departmentname','wardsname','ipads'];
  dataSource = new MatTableDataSource([]);
  dataSource2 = new MatTableDataSource<Zoneman>([]);
  
  selection = new SelectionModel<Zoneman>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  numberToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  @ViewChild(MatSort) sort: MatSort;


  ngOnInit() {
    var elements = [{ _id: 1, name: 'Paul Walker' },
    { _id: 2, name: 'Lisa' }];

    var elements2: Zoneman[] = [
      {zonename: "hello",
       department: [{
        departmentname: "1", 
        wards: [
          {wardsname: "3",
            ipads: [
              {nr: 1},
              {nr: 12},
              {nr: 4},
              {nr: 5}
            ]}
        ]}
      ]}]

    var elements3: Zoneman = [
      {zonename: "hello",
       department: [{
        departmentname: "1", 
        wards: [
          {wardsname: "3",
            ipads: [
              {nr: 1}
            ]}
        ]}
      ]}];

    this.dataSource = new MatTableDataSource(elements);
    this.dataSource2 = new MatTableDataSource<Zoneman>(elements2);
    this.dataSource.sort = this.sort;
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */