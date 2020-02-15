import { Component, OnInit } from "@angular/core";
import { AppState } from "./store/app-store.module";
import { Store } from "@ngrx/store";
import { AddError } from "./store/actions/errors.action";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "idea-app";

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new AddError({ error: "message" }));
  }
}
