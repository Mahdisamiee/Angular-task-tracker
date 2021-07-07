import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';
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
    // delete specific task & update list
    this.tasksService.deleteTask(task).subscribe(()=>(this.tasks = this.tasks.filter((t)=> t.id !== task.id)))
  }

  addTask(task:Task){
    this.tasksService.addTask(task).subscribe((task)=>(this.tasks.push(task)))
  }

  toggleReminder(task:Task){
    task.reminder = !task.reminder
    this.tasksService.updateTaskReminder(task).subscribe();
  }
}
