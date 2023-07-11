import { Component, OnInit } from '@angular/core';
import { UsersService } from './service/users.service';
import { Users } from './models/users';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  Usersary: Users[] = [];

  Usersformgroup: FormGroup;

  constructor(private userservice: UsersService, private formbuilder: FormBuilder) {
    this.Usersformgroup = this.formbuilder.group({

      firstName: [""],
      lastName: [""],
      email: [""],
      Gender: [""],
      address: [""],
      pinCode: [""],
      country: [""],
    })
  }
  ngOnInit(): void {
    this.getusers();
  }
  getusers() {
    this.userservice.GetUsers().subscribe(response => {
      console.log(response);
      this.Usersary = response;
    })
  }
  Onsubmit() {
    console.log(this.Usersformgroup.value);
    if (this.Usersformgroup.value.id != null && this.Usersformgroup.value.id != "") {
      this.userservice.UpdateUsers(this.Usersformgroup.value).subscribe(response => {
        console.log(response);
        this.getusers();
        this.Usersformgroup.setValue({

          firstName: "",
          lastName: "",
          email: "",
          Gender:"",
          address: "",
          pinCode:"",
          country:""
        })
      })
    }
    else {
      this.userservice.CreateUsers(this.Usersformgroup.value).subscribe(response => {
        console.log(response);
        this.getusers();
        this.Usersformgroup.setValue({

          firstName: "",
          lastName: "",
          email: "",
          Gender:"",
          address: "",
          pinCode:"",
          country:""
        })
      })
    }
  }
  Fillform(user: Users) {
    this.Usersformgroup.setValue({

      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      Gender: user.Gender,
      address: user.address,
      pincode: user.pinCode,
      country: user.country
    })
  }
  DeleteUser(id:number) {
    debugger
    this.userservice.DeleteUsers(id).subscribe(res => {
      console.log(res);
      this.getusers();
    })
  }
  title = 'my-first-project';
}
