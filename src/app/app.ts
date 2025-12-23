import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FiguresComponent } from './components/figures/figures.component';
import { Estado } from './interfaces/estados.interface';
import { Municipio } from './interfaces/municipios.interface';
import { AppService } from './services/app.service';
import { TypeConsultant } from './types/consultant.types';

@Component({
    selector: 'app-root',
    imports: [ReactiveFormsModule, FiguresComponent],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly title = signal('reco');
    #fb = inject(FormBuilder);
    steps: WritableSignal<number> = signal(1);
    typeConsultant: WritableSignal<TypeConsultant> = signal('');
    appService = inject(AppService);
    estados = signal<Estado[]>([]);
    municipios = signal<Municipio[]>([]);

    useEffect = effect(() => {
        console.log(`The current step is ${this.steps()}`);
    });

    // OnInit
    ngOnInit() {
        this.getAllEstados();
    }

    getAllEstados() {
        this.appService.getAllEstados().subscribe({
            next: (response) => {
                this.estados.set(response);
            },
            error: (error) => {
                //   Swal.fire({
                //     icon: 'error',
                //     title: '¡Error!',
                //     text: 'Ocurrió un problema al procesar la solicitud.',
                //     confirmButtonText: 'Aceptar'
                //   });
            },
        });
    }

    getAllMunicipiosByID(id: number) {
        this.appService.getAllMunicipiosByID(id).subscribe({
            next: (response) => {
                this.municipios.set(response);
            },
            error: (error) => {
                //   Swal.fire({
                //     icon: 'error',
                //     title: '¡Error!',
                //     text: 'Ocurrió un problema al procesar la solicitud.',
                //     confirmButtonText: 'Aceptar'
                //   });
            },
        });
    }

    // Forms
    mainForm = this.#fb.group({
        fiscalRegime: this.#fb.group({
            TipoConsultor: ['', Validators.required],
            FiscalRegime: ['', Validators.required],
        }),
        registerConsultoria: this.#fb.group({
            razon_social: ['', Validators.required],
            nombre_comercial: ['', Validators.required],
            rfc: ['', Validators.required],
            tipo_empresa: ['', Validators.required],
            calle: ['', Validators.required],
            codigo_postal: ['', Validators.required],
            no_int: ['', Validators.required],
            no_ext: ['', Validators.required],
            estado: ['', Validators.required],
            municipio: ['', Validators.required],
            telefono: ['', Validators.required],
            website: ['', Validators.required],
            slogan: ['', Validators.required],
            clave: ['', Validators.required],
            nombre_corto: ['', Validators.required],
        }),
        registerPersona: this.#fb.group({
            // ConsultoriaID: ['', Validators.required],
            Nombres: ['', Validators.required],
            ApPaterno: ['', Validators.required],
            ApMaterno: ['', Validators.required],
            Genero: ['', Validators.required],
            FNacimiento: ['', Validators.required],
            Email: ['', Validators.required, Validators.email],
            Telefono: ['', Validators.required],
            Usuario: ['', Validators.required],
            Password: ['', Validators.required],
            Cedula: ['', Validators.required],
            Token: ['', Validators.required],
            Grado: ['', Validators.required],
            Nivel: ['', Validators.required],
            Especialidad: ['', Validators.required],
            Especializacion: ['', Validators.required],
            Cp: ['', Validators.required],
            Estado: ['', Validators.required],
            Municipio: ['', Validators.required],
            Calle: ['', Validators.required],
            NoInt: ['', Validators.required],
            NoExt: ['', Validators.required],
        }),
    });

    // Getters de Forms
    get fiscalRegime() {
        return this.mainForm.get('fiscalRegime') as FormGroup;
    }

    get registerPersona() {
        return this.mainForm.get('registerPersona') as FormGroup;
    }

    get registerConsultoria() {
        return this.mainForm.get('registerConsultoria') as FormGroup;
    }

    nextStep() {
        if (this.fiscalRegime.invalid && this.steps() === 1) {
            this.fiscalRegime.markAllAsTouched();
            return;
        }

        if (this.registerPersona.invalid && this.steps() === 2) {
            this.registerPersona.markAllAsTouched();
            return;
        }

        this.steps.update((step) => step + 1);
        console.log(`FORM`);
        console.log(this.mainForm.value);
    }
}
