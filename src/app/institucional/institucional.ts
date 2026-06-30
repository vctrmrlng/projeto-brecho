import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-institucional',
  standalone: true,
  imports: [RouterModule],
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
          document.getElementById(fragment)
            ?.scrollIntoView({ behavior: 'smooth' });
        });
      }
    });
  }
}