create table users(
email varchar primary key,
password varchar,
first_name varchar,
last_name varchar,
height decimal,
height_type varchar check (height_type in('cm','ft')),
weight decimal,
weight_type varchar check (weight_type in ('kg','lb')),
age int,
gender varchar check (gender in ('M','F')),
workout_split varchar references workout_splits(workout_name),
experience varchar check (experience in ('Beginner','Intermediate','Expert'))
);

create table workout_splits(
workout_name varchar primary key,
sunday varchar array,
monday varchar array,
tuesday varchar array,
wednesday varchar array,
thursday varchar array,
friday varchar array,
saturday varchar array
);

create table workouts(
workout_date date,
email varchar references users(email) on delete cascade,
completed bool,
primary key(workout_date,email)
);

create table sets(
set_number int,
exercise_name varchar references exercises(exercise_name) on delete cascade,
workout_date date,
email varchar references users(email),
reps int,
weight decimal,
primary key(set_number,exercise_name,workout_date,email)
);
drop table sets
select * from sets

create table exercises(
exercise_name varchar primary key,
target varchar,
gif varchar
);

create table equipments(
equipment_name varchar primary key,
img varchar
);

create table users_equipment(
equipment_name varchar references equipments(equipment_name) on delete cascade,
email varchar references users(email) on delete cascade,
primary key(equipment_name,email)
);

create table exercises_equipments(
exercise_name varchar references exercises(exercise_name) on delete cascade,
equipment_name varchar references equipments(equipment_name) on delete cascade,
primary key(exercise_name,equipment_name)
);
select * from users_equipment
create table sets(
set_number int,
exercise_name varchar references exercises(exercise_name) on delete cascade,
workout_date date,
email varchar,
reps int,
weight decimal,
foreign key (workout_date,email) references workouts(workout_date,email) on delete cascade,
primary key(set_number,exercise_name,workout_date,email)
);

create table food(
food_name varchar primary key,
carbs decimal,
protein decimal,
fats decimal,
measurement_type varchar check (measurement_type in ('g','ml')),
measurement_value decimal
);

create table diary(
food_name varchar references food(food_name) on delete cascade,
email varchar references users(email) on delete cascade,
created date,
diary_type varchar check (diary_type in ('Breakfast','Lunch','Dinner','Snack')),
multiplier decimal,
primary key(food_name,email,created)
);

select exercises.exercise_name,exercises.target,exercises.gif from users_equipment
inner join equipments 
on users_equipment.equipment_name=equipments.equipment_name
inner join exercises_equipments
on equipments.equipment_name=exercises_equipments.equipment_name
inner join exercises
on exercises_equipments.exercise_name=exercises.exercise_name and target='Chest Compound'


insert into workout_splits values('PPL',array['Chest','Shoulders','Triceps'],array['Back','Biceps'],array['Legs','Abs'],array['Rest'],array['Chest','Shoulders','Triceps'],array['Back','Biceps'],array['Legs','Abs'])
insert into equipments values('Barbell Flat Bench','https://bit.ly/3VJSw4b')
insert into exercises values('Flat Bench Press','Chest Compound','https://bit.ly/3IlgXSd')
insert into exercises_equipments values('Flat Bench Press','Barbell Flat Bench')
insert into users_equipment values('barbell bench','test@gmail.com')

select * from exercises_equipments
insert into equipments values('Incline Bench','https://bit.ly/3vAch3x')
insert into exercises values('Incline Bench Press','Chest Compound','https://static.strengthlevel.com/images/illustrations/incline-bench-press-1000x1000.jpg')
insert into exercises_equipments values('Incline Bench Press','Incline Bench')

drop table equipments cascade

select * from equipments


