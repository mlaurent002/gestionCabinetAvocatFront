import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAffaireDocumentComponent } from './edit-affaire-document.component';

describe('EditAffaireDocumentComponent', () => {
  let component: EditAffaireDocumentComponent;
  let fixture: ComponentFixture<EditAffaireDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAffaireDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAffaireDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
