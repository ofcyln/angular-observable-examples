import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Observer, Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.css' ],
})
export class HomeComponent implements OnInit, OnDestroy {
    numbersObservablesSubscription: Subscription;
    customObservablesSubscription: Subscription;

    constructor() {
    }

    ngOnInit() {
        // first observable
        const myNumbers = interval(1000);

        this.numbersObservablesSubscription = myNumbers.pipe(
            // rxjs operator
            map(
                (data: number) => {
                    return data * 2;
                },
            ),
        ).subscribe(
            (num: number) => {
                console.log(num);
            },
        );

        // second observable
        const myObservable = Observable.create(
            (observer: Observer<string>) => {
                setTimeout(() => {
                    observer.next('first package');
                }, 2000);

                setTimeout(() => {
                    observer.next('second package');
                }, 4000);

                setTimeout(() => {
                    observer.complete();
                }, 5000);

                setTimeout(() => {
                    observer.next('third package!');
                }, 7000);

            },
        );

        this.customObservablesSubscription = myObservable.subscribe(
            (data: string) => {
                console.log(data);
            },
            (error: string) => {
                console.log(error);
            },
            () => {
                console.log('Completed!');
            },
        );
    }

    ngOnDestroy() {
        this.numbersObservablesSubscription.unsubscribe();
        this.customObservablesSubscription.unsubscribe();
    }

}
