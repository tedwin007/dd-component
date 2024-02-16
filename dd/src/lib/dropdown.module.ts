import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownTreeComponent} from "./dropdown-tree/dropdown-tree.component";
import {CheckboxOptionComponent} from "./checkbox-option/checkbox-option.component";
import {DropdownContainerComponent} from "./dropdown-container.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        DropdownTreeComponent,
        CheckboxOptionComponent,
        ReactiveFormsModule,
        DropdownContainerComponent,
        FormsModule,
        CommonModule
    ],
    exports: [DropdownContainerComponent,CheckboxOptionComponent,DropdownTreeComponent]
})
export class DropdownModule {
}
