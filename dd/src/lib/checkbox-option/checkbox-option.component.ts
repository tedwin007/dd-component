import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NodeWithCheckBox} from "../models/classes/dropdown-tree.class";

@Component({
    selector: 'checkbox-option',
    template: `
        <div *ngIf="!!node.children.length" class="collapsed-btn" (click)="toggleCollapse()">
            {{ node.collapsed ? '+' : '-' }}
        </div>

        <span class="checkbox-container">
      <input type="checkbox"
             [indeterminate]="node.checked === 2"
             [checked]="node.checked === 1"
             (change)="optionSelected.emit(node)"/>
      <ng-content></ng-content>
    </span>
    `,
    styleUrls: ['./checkbox-option.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, FormsModule]
})
export class CheckboxOptionComponent {
    @Input() node!: NodeWithCheckBox
    @Output() optionSelected: EventEmitter<NodeWithCheckBox> = new EventEmitter();

    toggleCollapse(): void {
        this.node.toggleCollapseState()
    }
}
