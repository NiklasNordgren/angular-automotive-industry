import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OperationType } from 'src/app/model/operationtype.model';
import { Tool } from 'src/app/model/tool.model';
import { OperationTypeService } from 'src/app/service/operationtype.service';
import { ToolService } from 'src/app/service/tool.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent {
  @ViewChild(MatSort) sort!: MatSort;
  columnHeaders: string[] = ['id', 'name', 'operationTypeId', 'operationTypeName', 'desc'];
  operationTypeFormControl = new FormControl('');
  operationTypes: OperationType[] = [];
  tools: Tool[] = [];
  dataSource: any;
  isLoading = true;
  resultsLength = 0;

  constructor(
    private operationTypeService: OperationTypeService,
    private toolService: ToolService
  ) { }

  ngOnInit() {
    this.initData();
    this.initFormControls();
  }

  async initData(): Promise<void> {
    await this.initOperationTypes();
    await this.initTools();
    this.setOperationTypeNameOfTools(this.tools);
    this.resultsLength = this.tools.length;
    this.isLoading = false;
    this.dataSource = new MatTableDataSource(this.tools);
    this.dataSource.sort = this.sort;
  }

  private async initTools() {
    const tools = this.toolService.getAll();
    this.tools = await lastValueFrom(tools);
  }

  private async initOperationTypes() {
    const operationTypes = this.operationTypeService.getAll();
    this.operationTypes = await lastValueFrom(operationTypes);
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
      this.dataSource = new MatTableDataSource(this.filterToolsByOperationTypes(this.tools, selectedOperationTypes));
      this.dataSource.sort = this.sort;
    });
  }

  filterToolsByOperationTypes(toolsToFilter: Tool[], selectedOperationTypes: any): Tool[] {
    if (!selectedOperationTypes || selectedOperationTypes.length === 0)
      selectedOperationTypes = this.operationTypes;

    return toolsToFilter.filter(x => selectedOperationTypes.some((y: { id: string; }) => y.id == x.idList));
  }

}
