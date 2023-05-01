import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OperationType } from 'src/app/model/operationtype.model';
import { Tool } from 'src/app/model/tool.model';
import { OperationTypeService } from 'src/app/service/operationtype.service';
import { ToolService } from 'src/app/service/tool.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent {
  private subscriptions: Subscription = new Subscription();
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'name', 'operationTypeId', 'operationTypeName'];
  operationTypeFormControl = new FormControl('');
  operationTypes: OperationType[] = [];
  allTools: Tool[] = [];
  filteredTools: Tool[] = [];
  dataSource: any;

  constructor(
    private operationTypeService: OperationTypeService,
    private toolService: ToolService
  ) { }

  ngOnInit() {
    this.initData();
    this.initFormControls();
  }

  async initData(): Promise<void> {
    const operationTypes = this.operationTypeService.getAll();
    this.operationTypes = await lastValueFrom(operationTypes);
    const tools = this.toolService.getAll();
    this.allTools = await lastValueFrom(tools);
    this.setOperationTypeNameOfTools(this.allTools);
    this.filteredTools = this.allTools;
    this.dataSource = new MatTableDataSource(this.filteredTools);
    this.dataSource.sort = this.sort;
  }

  setOperationTypeNameOfTools(tools: Tool[]): void {
    tools.forEach(tool => {
      var operationType = this.operationTypes.find(x => x.id == tool.idList);
      if (operationType)
        tool.operationTypeName = operationType.name;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  initFormControls(): void {
    this.operationTypeFormControl.valueChanges.subscribe(selectedOperationTypes => {
      this.dataSource = new MatTableDataSource(this.filterToolsByOperationTypes(this.allTools, selectedOperationTypes));
    });
  }

  filterToolsByOperationTypes(toolsToFilter: Tool[], selectedOperationTypes: any): Tool[] {
    if (!selectedOperationTypes || selectedOperationTypes.length === 0)
      selectedOperationTypes = this.operationTypes;

    return toolsToFilter.filter(x => selectedOperationTypes.some((y: { id: string; }) => y.id == x.idList));
  }

}
