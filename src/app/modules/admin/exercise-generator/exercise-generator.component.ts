import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector     : 'exercise-generator',
    standalone   : true,
    templateUrl  : './exercise-generator.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ExerciseGeneratorComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
