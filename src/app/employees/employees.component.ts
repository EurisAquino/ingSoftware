import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../services/empleado.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {

  crearEmpleado!: FormGroup;
  submitted: boolean = false;

  id!: string | null;
  titulo = 'Nuevo Empleado';
  botonTitulo = 'Agregar empleado';

  constructor(
    private fb: FormBuilder,
    private _employeesService: EmpleadoService,
    private router: Router,
    private aRoute: ActivatedRoute
    ) {
      this.crearEmpleado = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        cedula: ['', Validators.required],
        puesto: ['', Validators.required],
        departamento: ['', Validators.required],
        salario: ['', Validators.required]
      })
      this.id = this.aRoute.snapshot.paramMap.get('id');
      console.log(this.id)
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarEmpleado() {
    this.submitted = true;

    if (this.crearEmpleado.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarEmpleado();
    } else {
      this.editarEmpleado(this.id);
    }

  }

  agregarEmpleado(){
    this.submitted = true;
    if (this.crearEmpleado.invalid) {
      return;
    }
    const empleado: any = {
      nombre: this.crearEmpleado.value.nombre,
      apellido: this.crearEmpleado.value.apellido,
      cedula: this.crearEmpleado.value.cedula,
      puesto: this.crearEmpleado.value.puesto,
      departamento: this.crearEmpleado.value.departamento,
      salario: this.crearEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this._employeesService.agregarEmpleado(empleado).then(()=>{
      console.log('Empleado agregado con exito');
      this.router.navigate(['/home']);
    }).catch(err => {
      console.log(err);
    })
  }

  editarEmpleado(id: string) {
    const empleado: any = {
      nombre: this.crearEmpleado.value.nombre,
      apellido: this.crearEmpleado.value.apellido,
      cedula: this.crearEmpleado.value.cedula,
      puesto: this.crearEmpleado.value.puesto,
      departamento: this.crearEmpleado.value.departamento,
      salario: this.crearEmpleado.value.salario,
      fechaActualizacion: new Date()
    }

    this._employeesService.actualizarEmpleado(id, empleado).then(() => {
      this.router.navigate(['/home']);
    })
  }

  esEditar() {
    
    if (this.id !== null) {
      this.titulo = 'Editar Empleado';
      this.botonTitulo = 'Actualizar Empleado';

      this._employeesService.getEmpleado(this.id).subscribe(data => {
        this.crearEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          cedula: data.payload.data()['cedula'],
          puesto: data.payload.data()['puesto'],
          departamento: data.payload.data()['departamento'],
          salario: data.payload.data()['salario'],
        })
      })
    }
  }

}
