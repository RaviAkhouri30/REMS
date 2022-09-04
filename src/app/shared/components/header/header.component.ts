import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private userName: string;
  @ViewChild('hamMenu') private hamMenu!: ElementRef;

  constructor() {
    this.userName = 'Hi, Guest';
  }

  ngOnInit(): void {
  }

  public showMenu = (): void => {
    const _div = this.hamMenu.nativeElement as HTMLDivElement;
    if (_div.style.display === 'none') {
      _div.style.display = 'block';
      return;
    }
    _div.style.display = 'none';
  }

}
