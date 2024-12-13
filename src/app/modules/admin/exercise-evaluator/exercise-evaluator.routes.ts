import { Routes } from '@angular/router';
import { ExerciseGeneratorComponent } from 'app/modules/admin/exercise-generator/exercise-generator.component';
import { ExerciseEvaluatorComponent } from './exercise-evaluator.component';

export default [
    {
        path     : '',
        component: ExerciseEvaluatorComponent,
    },
] as Routes;
