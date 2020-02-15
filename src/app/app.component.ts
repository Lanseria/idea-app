import { Component, OnInit } from "@angular/core";
import { AppState } from "./store/app-store.module";
import { Store } from "@ngrx/store";
import { SetInitialUser } from "./store/actions/auth.action";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "idea-app";

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new SetInitialUser());
  }
}
