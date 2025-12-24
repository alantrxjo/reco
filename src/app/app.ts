import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FiguresComponent } from './components/figures/figures.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ReactiveFormsModule, FiguresComponent],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly title = signal('reco');

    // Función que lee directamente window.location para evaluación inmediata
    isRegistroRoute() {
        return window.location.pathname.includes('/home/');
    }
}
