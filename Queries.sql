create table users(
user_id serial primary key,
email varchar unique,
password varchar,
first_name varchar,
last_name varchar,
height decimal,
height_type varchar check (height_type in('cm','ft')),
weight decimal,
weight_type varchar check (weight_type in ('kg','lb')),
age int,
gender varchar check (gender in ('M','F')),
workout_split serial references workout_splits(workout_split_id),
experience varchar check (experience in ('Beginner','Intermediate','Expert'))
);
drop table users cascade
create table workout_splits(
workout_split_id serial primary key,
workout_name varchar unique,
sunday varchar array,
monday varchar array,
tuesday varchar array,
wednesday varchar array,
thursday varchar array,
friday varchar array,
saturday varchar array
);

create table exercises(
exercise_id serial primary key,
exercise_name varchar unique,
target varchar,
gif varchar
);

create table sets(
set_number int,
exercise_id serial references exercises(exercise_id) on delete cascade,
workout_date date,
user_id serial references users(user_id) on delete cascade,
reps int,
weight decimal,
weight_type varchar check (weight_type in ('kg','lb')),
primary key(set_number,exercise_id,workout_date,user_id)
);

drop table sets
select * from sets
delete from sets

create table equipments(
equipment_id serial primary key,
equipment_name varchar unique,
img varchar
);

create table users_equipment(
equipment_id serial references equipments(equipment_id) on delete cascade,
user_id serial references users(user_id) on delete cascade,
primary key(equipment_id,user_id)
);

create table exercises_equipments(
exercise_id serial references exercises(exercise_id) on delete cascade,
equipment_id serial references equipments(equipment_id) on delete cascade,
primary key(exercise_id,equipment_id)
);

select * from users_equipment

create table food(
food_id serial primary key,
food_name varchar unique,
carbs decimal,
protein decimal,
fats decimal,
measurement_type varchar check (measurement_type in ('g','ml','piece')),
measurement_value decimal
);
drop table food cascade
create table diary(
food_id serial references food(food_id) on delete cascade,
user_id serial references users(user_id) on delete cascade,
created date,
diary_type varchar check (diary_type in ('Breakfast','Lunch','Dinner','Snack')),
multiplier decimal,
primary key(food_id,user_id,created,diary_type)
);
select * from diary
select exercises.exercise_name,exercises.target,exercises.gif from users_equipment
inner join equipments 
on users_equipment.equipment_name=equipments.equipment_name
inner join exercises_equipments
on equipments.equipment_name=exercises_equipments.equipment_name
inner join exercises
on exercises_equipments.exercise_name=exercises.exercise_name and target='Chest Compound'


insert into workout_splits values(default,'PPL',array['Chest','Shoulders','Triceps'],array['Back','Biceps'],array['Legs','Abs'],array['Rest'],array['Chest','Shoulders','Triceps'],array['Back','Biceps'],array['Legs','Abs'])
insert into equipments values(default,'Barbell Flat Bench','https://bit.ly/3VJSw4b')
insert into exercises values(default,'Flat Bench Press','Chest Compound','https://bit.ly/3IlgXSd')
insert into exercises_equipments values('Flat Bench Press','Barbell Flat Bench')
insert into users_equipment values('barbell bench','test@gmail.com')

select * from exercises_equipments
insert into equipments values(default,'Incline Bench','https://bit.ly/3vAch3x')
insert into exercises values(default,'Incline Bench Press','Chest Compound','https://static.strengthlevel.com/images/illustrations/incline-bench-press-1000x1000.jpg')
insert into exercises_equipments values(1,1)
insert into exercises_equipments values(2,2)

drop table equipments cascade

select * from equipments
select * from users_equipment
select * from exercises

select * from users

drop schema public cascade
create schema public

alter table users drop age; 
alter table users add dob date