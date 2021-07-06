import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TasksService } from '../../services/tasks.service'
import { Task } from '../../Task';
// import { TASKS } from 'src/app/mock-tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksService.getTask().subscribe((tasks) => this.tasks = tasks);
  }
  
  deleteTask(task:Task){
    console.log("please!!!", task);
    // delete specific task
    this.tasksService.deleteTask(task).subscribe(()=>(this.tasks = this.tasks.filter((t)=> t.id !== task.id)))
    // refresh list
    // this.tasksService.getTask().subscribe((tasks) => this.tasks = tasks);
  }

  toggleReminder(task:Task){
    task.reminder = !task.reminder
    this.tasksService.updateTaskReminder(task).subscribe();
  }
}
