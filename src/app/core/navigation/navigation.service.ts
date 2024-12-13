import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Navigation } from 'app/core/navigation/navigation.types';
import { Observable, of, ReplaySubject, tap } from 'rxjs';
import { FuseNavigationItem } from '../../../@fuse/components/navigation';

@Injectable({ providedIn: 'root' })
export class NavigationService {
    private _navigationData: FuseNavigationItem[] =[
        {
            id   : 'exercise-generator',
            title: 'Exercise Generator',
            type : 'basic',
            icon : 'heroicons_outline:pencil-square',
            link : '/exercise-generator'
        },
        {
            id   : 'exercise-evaluator',
            title: 'Exercise Evaluation',
            type : 'basic',
            icon : 'heroicons_outline:document-check',
            link : '/exercise-evaluator'
        },
        {
            id: 'divider-1',
            type: 'divider',
        },
        {
        id: 'courses',
        title: 'Courses',
        type: 'group',
        icon: 'heroicons_outline:bars-3',
        children: [
            {
                id   : 'course-1',
                title: 'Informatik A',
                type : 'basic',
                icon : 'heroicons_outline:folder',
                link : '#'
            },
            {
                id   : 'course-2',
                title: 'Informatik B',
                type : 'basic',
                icon : 'heroicons_outline:folder',
                link : '#'
            },
            {
                id   : 'course-3',
                title: 'Informatik C',
                type : 'basic',
                icon : 'heroicons_outline:folder',
                link : '#'
            },
        ]},
];
    private _navigation: Navigation = {
        compact: this._navigationData,
        default: this._navigationData,
        futuristic: this._navigationData,
        horizontal: this._navigationData
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return of(this._navigation);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        return of(this._navigation);
    }
}
