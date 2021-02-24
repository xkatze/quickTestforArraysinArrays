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

export class Requester{

  zone: string;
  department: string;
  ward: string;
  ipad: string;

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
  yow1: string;
  yow2: string;

  yow3: string;

  selection = new SelectionModel<Zoneman>(true, []);
  selectionipad = new SelectionModel<Department>(true, []);
  selectionward = new SelectionModel<Ward>(true, []);
  selectiondepartment = new SelectionModel<Ipad>(true, []);

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
    var buildtarget: Zoneman2 = new Zoneman2();
    buildtarget.zone = [];

    for (let i = 0; i < this.elements2.length; i++) {
      var tempzone = new Zone();
      tempzone.name = this.elements2[i].zonename;

      tempzone.child = [];
      for (let j = 0; j < this.elements2[i].department.length; j++) {
        var tempdepartment = new Department();

        tempdepartment.name = this.elements2[i].department[j].departmentname;

        tempdepartment.child = [];
        tempdepartment.parent = tempzone;


        for (let k = 0; k < this.elements2[i].department[j].wards.length; k++) {
          var tempward = new Ward();

          tempward.name = this.elements2[i].department[j].wards[k].wardsname;
          tempward.parent = tempdepartment;
          tempward.child = [];
          //tempward.parent.child.push(tempward)

          for (let p = 0; p < this.elements2[i].department[j].wards[k].ipads.length;
            p++) {
            var tempipad = new Ipad();

            tempipad.name = this.elements2[i].department[j].wards[k].ipads[
              p
            ].toString();
            tempipad.parent = tempward;
            //tempipad.parent.child.push(tempipad)

            tempward.child.push(tempipad);
          }

          tempdepartment.child.push(tempward);
        }
        tempzone.child.push(tempdepartment);
      }
      buildtarget.zone.push(tempzone);
    }

    this.elements4 = [buildtarget];
  }

  upwardsSelectIpad(spad: Ipad){
    this.selectionward.select(spad.parent);
    this.selectionipad.select(spad.parent.parent);

    this.selectiondepartment.toggle(spad);
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

    this.createZones();
    /*var tempzoneman = new Zoneman2();

    var tempzone = new Zone();

    var temppdepartment = new Department();

    var tempward = new Ward();

    temppdepartment.parent = tempzone;
    tempzone.name = "13";
    temppdepartment.name = "2";

    tempzone.child = [temppdepartment];

    tempzoneman.zone = [tempzone];

    this.elements4 = [tempzoneman];*/

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

  hello1(){
    this.yow1= " ";
    this.selectionward.selected.forEach(ward => (this.yow1 += " " + ward.name + " with parent " + ward.parent.name))
  }

  hello2(){
    this.yow2 = " ";
    this.selectiondepartment.selected.forEach(ipad =>  (this.yow2 += " " + ipad.name + " with parent " + ipad.parent.name));
    this.yow3 = "parent has child: ";
    this.selectiondepartment.selected.forEach(ipad => (ipad.parent.child.forEach(ipadparent => this.yow3 += ipadparent.name + " ")));
  }

  hello3(){

    var shower: Array<Requester>;
    shower = [];

    if(this.selectiondepartment.selected.length != 0){
      for(let i = 0; i < this.selectiondepartment.selected.length; i++){
        var temp = new Requester();
        temp.ipad = this.selectiondepartment.selected[i].name;
        temp.ward = this.selectiondepartment.selected[i].parent.name;
        temp.department = this.selectiondepartment.selected[i].parent.parent.name;
        shower.push(temp);
      }
    }

    
    var show = new Requester();

  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
