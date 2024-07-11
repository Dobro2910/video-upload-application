import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SideBarComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
      console.log('Side Bar component initialized');
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const burgerIcon = document.getElementById('burger-icon');
        if (sidebar && burgerIcon) {
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                setTimeout(() => {
                  burgerIcon.style.display = 'block';
                }, 200)
            } else {
                sidebar.classList.add('active');
                burgerIcon.style.display = 'none';
            }
        }
    }
}
