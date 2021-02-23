import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatTableDataSource } from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";

export interface Zoneman {
  zonename: string;
  department: [
    {
      departmentname: string;
      wards: [{ wardsname: string; ipads: Array<Number> }];
    }
  ];
}

export class Zoneman2 {
  zone: Zone[];
}

export class Zone {
  name: string;
  child: Array<Department>;
}

export class Department {
  name: string;
  parent: Zone;
  child: Array<Ward>;
}

export class Ward {
  name: string;
  parent: Department;
  child: Array<Ipad>;
}

export class Ipad {
  name: string;
  parent: Ward;
}

@Component({
  selector: "table-sorting-example",
  styleUrls: ["table-sorting-example.css"],
  templateUrl: "table-sorting-example.html"
})
export class TableSortingExample implements OnInit {
  displayedColumns: string[] = ["_id", "name"];
  displayedColumns2: string[] = [
    "zonename",
    "departmentname",
    "wardsname",
    "ipads"
  ];
  dataSource = new MatTableDataSource([]);
  dataSource2 = new MatTableDataSource<Zoneman>([]);
  dataSource3 = new MatTableDataSource<Zoneman2>([]);

  elements2: Zoneman[];
  elements4: Zoneman2[];

  yow: string;

  selection = new SelectionModel<Zoneman>(true, []);
  selectionipad = new SelectionModel<Department>(true, []);

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

  selectIpad(first: number, second: number, third: number, fourth: number) {
    var ipadid = this.elements2[first].department[second].wards[third].ipads[
      fourth
    ];
    var zoneid = this.elements2[first.toString()];
    var departmentid = this.elements2[first].department[second];
    var wardid = this.elements2[first].department[second].wards[third];

    //skal lige finde en metode som vil give mening tænke arbejde er nederen.
  }

  createZones() {
    var buildtarget: Zoneman2;

    for (let i = 0; i < this.elements2.length; i++) {
      var tempzone = new Zone();
      tempzone.name = this.elements2[i].zonename;
      for (let j = 0; this.elements2[i].department.length; j++) {
        var tempdepartment = new Department();
        tempdepartment.name = this.elements2[i].department[j].departmentname;
      }

      buildtarget.zone.push(tempzone);
    }
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    var elements = [{ _id: 1, name: "Paul Walker" }, { _id: 2, name: "Lisa" }];

    this.elements2 = [
      {
        zonename: "hello",
        department: [
          {
            departmentname: "1",
            wards: [{ wardsname: "3", ipads: [1, 12, 3, 5] }]
          },
          {
            departmentname: "2",
            wards: [{ wardsname: "7", ipads: [1, 8, 7, 6] }]
          }
        ]
      }
    ];

    var tempzoneman = new Zoneman2();

    var tempzone = new Zone();

    var temppdepartment = new Department();

    var tempward = new Ward();

    temppdepartment.parent = tempzone;
    tempzone.name = "13";
    temppdepartment.name = "2";

    tempzone.child = [temppdepartment];

    tempzoneman.zone = [tempzone];

    this.elements4 = [tempzoneman];

    var elements3: Zoneman = [
      {
        zonename: "hello",
        department: [
          {
            departmentname: "1",
            wards: [{ wardsname: "3", ipads: [{ nr: 1 }] }]
          }
        ]
      }
    ];

    this.dataSource = new MatTableDataSource(elements);
    this.dataSource2 = new MatTableDataSource<Zoneman>(this.elements2);
    this.dataSource3 = new MatTableDataSource<Zoneman2>(this.elements4);
    this.dataSource.sort = this.sort;

    //this.elements4.forEach(zone => zone.zone.forEach(name => this.yow = name.name));
    //console.log(JSON.stringify(this.elements4));
  }

  hello() {
    this.yow = " ";
    this.selectionipad.selected.forEach(
      department => (this.yow += department.name)
    );
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
