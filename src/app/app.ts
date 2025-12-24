import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
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
