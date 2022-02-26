import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private papa: Papa) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      
  }

  fileChange(event) {
    let file = event.target.files[0]
    let fileReader = new FileReader()
    fileReader.readAsText(file)
    fileReader.onload = () => {
      console.log('fileReader result ', fileReader.result)
      this.papa.parse(fileReader.result.toString(), {
        complete: r => {
          console.log('Parsed: ', r)
        }
      })
    }
    fileReader.onerror = () => {
      console.log('fileReader error ', fileReader.error)
    }
    console.log('file ', file)
    
    
  }

}
