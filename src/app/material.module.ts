import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  imports: [MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatStepperModule,
    MatBottomSheetModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatStepperModule,
    MatBottomSheetModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})

export class MaterialModule{

}
