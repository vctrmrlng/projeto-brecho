import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-institucional',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './institucional.html',
  styleUrl: './institucional.css',
})
export class Institucional implements OnInit {

  secaoAtiva: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
  this.route.fragment.subscribe(fragment => {
    this.secaoAtiva = fragment;

    if (fragment) {
      setTimeout(() => {
        const el = document.getElementById(fragment);

        if (el) {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  });
}
}