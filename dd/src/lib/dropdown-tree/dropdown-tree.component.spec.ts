import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DropdownTreeComponent} from './dropdown-tree.component';
import {CheckboxOptionComponent} from '../checkbox-option/checkbox-option.component';
import {DropDownTree, NodeWithCheckBox} from '../models/classes/dropdown-tree.class';
import {CheckboxState} from '../models/enums/checkbox-state.enum';
import {selectTree} from "../models/tests/mocks";

describe('DropdownTreeComponent', () => {
    let component: DropdownTreeComponent;
    let fixture: ComponentFixture<DropdownTreeComponent>;
    let tree = new DropDownTree(selectTree.label, 'BaaaLii', selectTree.children)
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, ReactiveFormsModule, FormsModule, DropdownTreeComponent, CheckboxOptionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DropdownTreeComponent);
        component = fixture.componentInstance;
        component.nodes = tree.children;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('tracks nodes by function', () => {
        const index = 0;
        const node = component.nodes[0];
        expect(component.trackByFn(index, node)).toEqual('0.1' + index);
    });

    it('marks node as checked or unchecked', () => {
        const node = component.nodes[1];
        expect(node.checked).toEqual(CheckboxState.unchecked);
        component.markAs(node);
        expect(node.checked).toEqual(CheckboxState.checked);
        expect(node.collapsed).toEqual(true);
    });

    it('renders nodes and reacts to markAs correctly', () => {
        fixture.detectChanges();
        const checkboxOptions = fixture.debugElement.queryAll(By.directive(CheckboxOptionComponent));
        expect(checkboxOptions.length).toEqual(2);
        const firstNode = component.nodes[0];
        component.markAs(firstNode);
        fixture.detectChanges();
        expect(firstNode.checked).toEqual(CheckboxState.checked);
        expect(firstNode.collapsed).toEqual(true);
    });

    // todo: bug?
    xit('handles null nodes input gracefully', () => {
        // @ts-ignore
        component.nodes = null;
        fixture.detectChanges();
        const checkboxOptions = fixture.debugElement.queryAll(By.directive(CheckboxOptionComponent));
        expect(checkboxOptions.length).toEqual(0);
    });

    // todo: bug?
    xit('handles nodes with undefined or null values', () => {
        // @ts-ignore
        component.nodes = [undefined, null];
        fixture.detectChanges();
        const checkboxOptions = fixture.debugElement.queryAll(By.directive(CheckboxOptionComponent));
        expect(checkboxOptions.length).toEqual(0);
    });

    it('renders correctly when nodes are dynamically added', () => {
        component.nodes = [];
        let checkboxOptions = fixture.debugElement.queryAll(By.directive(CheckboxOptionComponent));
        expect(checkboxOptions.length).toEqual(0);
        component.nodes = [
            new NodeWithCheckBox([selectTree.children[0] as any], 1, '1', 'bla'),
            new NodeWithCheckBox([selectTree.children[1] as any], 1, '2', 'blabla'),
        ];
        fixture.detectChanges();
        checkboxOptions = fixture.debugElement.queryAll(By.directive(CheckboxOptionComponent));
        expect(checkboxOptions.length).toEqual(2);
    });
});
