import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DropdownContainerComponent} from './dropdown-container.component';

describe('DropdownComponent', () => {
    let component: DropdownContainerComponent;
    let fixture: ComponentFixture<DropdownContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DropdownContainerComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DropdownContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
