import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { TdMediaService } from "@covalent/core/media";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import {ArrayDataSource} from '@angular/cdk/collections';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { tdRotateAnimation } from '@covalent/core/common';

export interface CodeNode {
  name: string;
  children?: CodeNode[];
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

interface Connection {
  value: string;
  viewValue: string;
  user: string;
}


const TREE_DATA: CodeNode[] = [
  {
    name: 'bucket_name',
    children: [
      {
        name: 'ux_folder',
        children: [
          {
            name: 'ux_yearly',
            children: [
              {
                name: 'ux_2015',
                children: [
                  {
                    name: 'ux_2015_q1',
                    children: [
                      {
                        name: 'ux_2015_jan',
                        children: [
                          {
                            name: 'ux_2015_jan_emea',
                            children: [
                              {
                                name: 'ux_2015_jan_london',
                                children: [
                                  {
                                    name: 'ux_2015_jan_london_kingscross',
                                    children: [
                                      {
                                        name: 'ux_2015_jan_london_kingscross1',
                                        children: [
                                          {
                                            name: 'ux_2015_jan_london_faringdon',
                                            children: [
                                              {
                                                name: 'ux_2015_jan_london_chancestreet',
                                                children: [
                                                  { name: 'ux_2015_jan_london_brits' },
                                                  { name: 'ux_2015_jan_london_blokes' },
                                                  { name: 'ux_2015_jan_london_football' },
                                                  { name: 'ux_2015_jan_london_jewels' },
                                                ]
                                              },
                                            ]
                                          },
                                        ]
                                      },
                                      {
                                        name: 'ux_2015_jan_london_kingscross2',
                                        children: [
                                          { name: 'ux_2015_jan_london_brits' },
                                          { name: 'ux_2015_jan_london_blokes' },
                                          { name: 'ux_2015_jan_london_football' },
                                          { name: 'ux_2015_jan_london_jewels' },
                                        ]
                                      },
                                    ]
                                  },
                                  {
                                    name: 'ux_2015_jan_london_hydepark',
                                    children: [
                                      { name: 'ux_2015_jan_london_brits' },
                                      { name: 'ux_2015_jan_london_blokes' },
                                      { name: 'ux_2015_jan_london_football' },
                                      { name: 'ux_2015_jan_london_jewels' },
                                    ]
                                  },
                                ]
                              },
                            ]
                          },
                        ]
                      },
                    ]
                  },
                ]
              },
            ]
          },
        ]
      }, {
        name: 'finance_folder',
        children: [
          {
            name: 'finance_yearly',
            children: [
              {
                name: 'finance_2015',
                children: [
                  {
                    name: 'finance_2015_q1',
                    children: [
                      {
                        name: 'finance_2015_jan',
                        children: [
                          {
                            name: 'finance_2015_jan_emea',
                            children: [
                              {
                                name: 'finance_2015_jan_london',
                                children: [
                                  { name: 'finance_2015_jan_london_brits' },
                                  { name: 'finance_2015_jan_london_blokes' },
                                  { name: 'finance_2015_jan_london_football' },
                                  { name: 'finance_2015_jan_london_jewels' },
                                ]
                              },
                            ]
                          },
                        ]
                      },
                    ]
                  },
                ]
              },
            ]
          },
        ]
      },  {
        name: 'personal_folder',
        children: [
          {
            name: 'personal_yearly',
            children: [
              {
                name: 'personal_2015',
                children: [
                  {
                    name: 'personal_2015_q1',
                    children: [
                      {
                        name: 'personal_2015_jan',
                        children: [
                          {
                            name: 'personal_2015_jan_emea',
                            children: [
                              {
                                name: 'personal_2015_jan_london',
                                children: [
                                  { name: 'personal_2015_jan_london_brits' },
                                  { name: 'personal_2015_jan_london_blokes' },
                                  { name: 'personal_2015_jan_london_football' },
                                  { name: 'personal_2015_jan_london_jewels' },
                                ]
                              },
                            ]
                          },
                        ]
                      },
                    ]
                  },
                ]
              },
            ]
          },
        ]
      },
    ]
  },
];



const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" }
];

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [
    tdRotateAnimation,
  ],
  preserveWhitespaces: true,
})
export class AppComponent {
  name = "Starter Template";
  expandedRail: boolean = false;
  displayedColumns: string[] = [
    "select",
    "position",
    "name",
    "weight",
    "symbol"
  ];
  editorVal: string = `
  SELECT department_number, sampleid
  FROM department
  SAMPLE .25, .25, .50
  ORDER BY sampleid;

  SELECT department_number, sampleid
  FROM department
  SAMPLE  3, 5, 8
  ORDER BY sampleid;
  `;
  connections: Connection[] = [
    {value: 'connection-0', viewValue: 'vantage_prod', user: 'firstname_last'},
    {value: 'connections-1', viewValue: 'vantage_dev', user: 'firstname_last'},
    {value: 'connections-2', viewValue: 'vantage_qa', user: 'firstname_last'}
  ];
  activeConnection: string = 'connection-0';
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  treeControl = new NestedTreeControl<CodeNode>(node => node.children);
  treeDataSource = new ArrayDataSource(TREE_DATA);

  hasChild = (_: number, node: CodeNode) => !!node.children && node.children.length > 0;

  get selectedRowNum() {
    return this.selection.selected.length;
  }

  consoleSelection() {
    console.log(this.selection.selected);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** Rail toggle **/
  toggleRail() {
    this.expandedRail = !this.expandedRail;
  }

  clearAllSelections() {
    this.selection.clear();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.position + 1}`;
  }

  

  routes: Object[] = [
    {
      icon: "home",
      route: ".",
      title: "Home"
    },
    {
      icon: "library_books",
      route: ".",
      title: "Documentation"
    },
    {
      icon: "color_lens",
      route: ".",
      title: "Style Guide"
    },
    {
      icon: "view_quilt",
      route: ".",
      title: "Layouts"
    },
    {
      icon: "picture_in_picture",
      route: ".",
      title: "Components & Addons"
    }
  ];
  usermenu: Object[] = [
    {
      icon: "swap_horiz",
      route: ".",
      title: "Switch account"
    },
    {
      icon: "tune",
      route: ".",
      title: "Account settings"
    },
    {
      icon: "exit_to_app",
      route: ".",
      title: "Sign out"
    }
  ];

  constructor(
    public media: TdMediaService,
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer
  ) {
    

    this._iconRegistry.addSvgIconInNamespace(
      "assets",
      "teradata",
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        "https://raw.githubusercontent.com/Teradata/covalent/develop/src/assets/icons/teradata.svg"
      )
    );
    this._iconRegistry.addSvgIconInNamespace(
      "assets",
      "teradata-icon",
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        "https://raw.githubusercontent.com/Teradata/covalent/develop/src/assets/icons/teradata-icon.svg"
      )
    );
    this._iconRegistry.addSvgIconInNamespace(
      "assets",
      "teradata-dark",
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        "https://raw.githubusercontent.com/Teradata/covalent/develop/src/assets/icons/teradata-dark.svg"
      )
    );
  }
}
