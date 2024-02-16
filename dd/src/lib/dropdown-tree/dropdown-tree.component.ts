import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TreeNode} from "../models/interfaces/tree.interfaces";
import {CheckboxOptionComponent} from "../checkbox-option/checkbox-option.component";
import {NodeWithCheckBox} from "../models/classes/dropdown-tree.class";
import {CheckboxState} from "../models/enums/checkbox-state.enum";

@Component({
    selector: 'dropdown-tree',
    template: `
        <div *ngIf="nodes?.length">
            <ng-container *ngFor="let node of nodes; index as i;trackBy: trackByFn">
                <checkbox-option *ngIf="$any(node) as node"
                                 (optionSelected)="markAs(node)"
                                 [node]="node">
                    {{ node.label }}
                    <div *ngIf="node.children.length">
                        <dropdown-tree *ngIf="!node.collapsed"
                                       [nodes]="node.children"
                                       [parent]="node">
                        </dropdown-tree>
                    </div>
                </checkbox-option>
            </ng-container>
        </div>
    `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, CheckboxOptionComponent],
    styles: [`:host {
        padding: 5px
    }`]
})
export class DropdownTreeComponent {
    @Input() parent?: NodeWithCheckBox
    @Input() nodes!: NodeWithCheckBox[];

    trackByFn(index: number, node: TreeNode): string {
        return node.id + index
    }

    markAs(node: NodeWithCheckBox): void {
        const status: CheckboxState = this.getStatus(node);
        node.markAs(status);
        node.collapsed = true;
    }

    private getStatus(node: NodeWithCheckBox): CheckboxState {
        return node.checked === CheckboxState.checked ?
            CheckboxState.unchecked :
            CheckboxState.checked;
    }
}
