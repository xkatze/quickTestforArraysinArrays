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

export interface group {
  name: string;
  parent: group;
  child: Array<group>;
}

export class Zone implements group {
  parent: group;
  name: string;
  child: Array<group>;
}

export class Department implements group {
  name: string;
  parent: group;
  child: Array<group>;
}

export class Ward implements group {
  name: string;
  parent: group;
  child: Array<group>;
}

export class Ipad implements group {
  name: string;
  parent: group;
  child: Array<group>;
}

export class Requester {
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

  index: Array<number>;

  yow: string;
  yow1: string;
  yow2: string;

  yow3: string;

  selection = new SelectionModel<Zoneman>(true, []);
  selectionipad = new SelectionModel<Department>(true, []);
  selectionward = new SelectionModel<Ward>(true, []);
  selectionGroup = new SelectionModel<group>(true, []);
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

          for (
            let p = 0;
            p < this.elements2[i].department[j].wards[k].ipads.length;
            p++
          ) {
            var tempipad = new Ipad();

            tempipad.name = this.elements2[i].department[j].wards[k].ipads[
              p
            ].toString();
            tempipad.parent = tempward;
            tempipad.child = [];
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

  upwardsSelectIpad(spad: group) {

    this.selectionGroup.toggle(spad);
    if(Zone.prototype.isPrototypeOf(spad)){

    }else if(Department.prototype.isPrototypeOf(spad)){

    }else if(Ward.prototype.isPrototypeOf(spad)){
      if(!spad.parent.child.find(elem => {return this.selectionGroup.isSelected(elem); })){
        this.selectionGroup.deselect(spad.parent);
        this.selectiondepartment.deselect(spad.parent);
      }else{
        this.selectionGroup.select(spad.parent);
        this.selectiondepartment.select(spad.parent);
      }

    }else if(Ipad.prototype.isPrototypeOf(spad)){
      if(!spad.parent.child.find(elem => {return this.selectionGroup.isSelected(elem); })){
        this.selectionGroup.deselect(spad.parent);
        this.selectionGroup.deselect(spad.parent.parent);
        this.selectionward.deselect(spad.parent);
        this.selectiondepartment.deselect(spad.parent.parent);
      }else{
        this.selectionGroup.select(spad.parent);
        this.selectionGroup.select(spad.parent.parent);
        this.selectionward.select(spad.parent);
        this.selectiondepartment.select(spad.parent.parent);
      }
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
            wards: [
              { wardsname: "7", ipads: [1, 8, 7, 6] },
              { wardsname: "9", ipads: [4, 6, 2, 0] }
            ]
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
    this.selectionipad.selected.forEach(department => {
      this.yow += " " + department.name + " " 
    });
  }

  hello1() {
    this.yow1 = " ";
    this.selectiondepartment.selected.forEach(
      ward =>
        (this.yow1 += " " + ward.name + " with parent " + ward.parent.name)
    );
  }

  hello2() {
    this.yow2 = " ";
    this.selectionward.selected.forEach(
      ipad =>
        (this.yow2 += " " + ipad.name + " with parent " + ipad.parent.name)
    );

    /* this.yow3 = "parent has child: ";
    this.selectiondepartment.selected.forEach(ipad =>
      ipad.parent.child.forEach(
        ipadparent => (this.yow3 += ipadparent.name + " ")
      )
    );*/
  }

  hello3() {
    var shower: Array<Requester>;
    shower = [];
    console.log("hej3");
    var logman = 0;
    if (this.selectiondepartment.selected.length != 0) {
      for (let i = 0; i < this.selectiondepartment.selected.length; i++) {
        console.log("hej");
        this.requestSelector(this.selectiondepartment.selected[i]);

        var tempdepartment: Department = this.selectiondepartment.selected[i];
        if (this.selectionward.selected.length != 0) {
          console.log("ward2")
          for (let j = 0; j < tempdepartment.child.length; j++) {
            this.requestSelector(this.selectionward.selected[j]);
            console.log("ward");
            var tempward: Ward = tempdepartment.child[j];
            if (this.selectionipad.selected.length != 0) {
              for (
                let k = 0;
                k < this.selectionipad.selected.length;
                k++
              ) {
                this.requestSelector(this.selectionipad.selected[k]);
                var tempRequest: Requester;
                
                logman++;

                //tilføj et chartDataRequest
              }
            }
          }
        }
      }
    }
    this.yow1 = " ";
    this.selectiondepartment.selected.forEach(
      ipad => (this.yow1 += ipad.name + " ")
    );
    this.yow2 = "" + logman;
    var show = new Requester();
  }

  requestSelector(group: group) {
     console.log("hej6");
    var anyChildren = group.child.find(elem => {
      return this.selectionGroup.isSelected(elem);
    });
    console.log("hej5");
    if (!anyChildren) {
      console.log("hej4");
      for (let i = 0; i < group.child.length; i++) {
        console.log("hej2");
        this.requestSelector(group.child[i]);
      }
    }
  
   if (Department.prototype.isPrototypeOf(group)) {
        this.selectiondepartment.select(group);
      } else if (Ward.prototype.isPrototypeOf(group)) {
        this.selectionward.select(group);
      } else if (Ipad.prototype.isPrototypeOf(group)) {
        this.selectionipad.select(group);
      }
  }
}
/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
