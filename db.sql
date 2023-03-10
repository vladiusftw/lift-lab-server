PGDMP         2        
         {            postgres    15.1    15.1 g    p           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            q           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            r           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            s           1262    5    postgres    DATABASE     ?   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE postgres;
                postgres    false            t           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3443                        2615    16769    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            u           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    6            v           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    6                        3079    17034 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            w           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            ?            1259    17044    diary    TABLE     ?  CREATE TABLE public.diary (
    food_id integer NOT NULL,
    user_id integer NOT NULL,
    created date NOT NULL,
    diary_type character varying NOT NULL,
    multiplier numeric,
    CONSTRAINT diary_diary_type_check CHECK (((diary_type)::text = ANY (ARRAY[('Breakfast'::character varying)::text, ('Lunch'::character varying)::text, ('Dinner'::character varying)::text, ('Snack'::character varying)::text])))
);
    DROP TABLE public.diary;
       public         heap    postgres    false    6            ?            1259    17050    diary_food_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.diary_food_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.diary_food_id_seq;
       public          postgres    false    6    215            x           0    0    diary_food_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.diary_food_id_seq OWNED BY public.diary.food_id;
          public          postgres    false    216            ?            1259    17051    diary_user_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.diary_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.diary_user_id_seq;
       public          postgres    false    6    215            y           0    0    diary_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.diary_user_id_seq OWNED BY public.diary.user_id;
          public          postgres    false    217            ?            1259    17052 
   equipments    TABLE     ?   CREATE TABLE public.equipments (
    equipment_id integer NOT NULL,
    equipment_name character varying,
    img character varying
);
    DROP TABLE public.equipments;
       public         heap    postgres    false    6            ?            1259    17057    equipments_equipment_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.equipments_equipment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.equipments_equipment_id_seq;
       public          postgres    false    218    6            z           0    0    equipments_equipment_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.equipments_equipment_id_seq OWNED BY public.equipments.equipment_id;
          public          postgres    false    219            ?            1259    17058 	   exercises    TABLE     ?   CREATE TABLE public.exercises (
    exercise_id integer NOT NULL,
    exercise_name character varying,
    target character varying,
    gif character varying
);
    DROP TABLE public.exercises;
       public         heap    postgres    false    6            ?            1259    17063    exercises_equipments    TABLE     r   CREATE TABLE public.exercises_equipments (
    exercise_id integer NOT NULL,
    equipment_id integer NOT NULL
);
 (   DROP TABLE public.exercises_equipments;
       public         heap    postgres    false    6            ?            1259    17066 %   exercises_equipments_equipment_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.exercises_equipments_equipment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.exercises_equipments_equipment_id_seq;
       public          postgres    false    221    6            {           0    0 %   exercises_equipments_equipment_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.exercises_equipments_equipment_id_seq OWNED BY public.exercises_equipments.equipment_id;
          public          postgres    false    222            ?            1259    17067 $   exercises_equipments_exercise_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.exercises_equipments_exercise_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.exercises_equipments_exercise_id_seq;
       public          postgres    false    6    221            |           0    0 $   exercises_equipments_exercise_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.exercises_equipments_exercise_id_seq OWNED BY public.exercises_equipments.exercise_id;
          public          postgres    false    223            ?            1259    17068    exercises_exercise_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.exercises_exercise_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.exercises_exercise_id_seq;
       public          postgres    false    6    220            }           0    0    exercises_exercise_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.exercises_exercise_id_seq OWNED BY public.exercises.exercise_id;
          public          postgres    false    224            ?            1259    17069    food    TABLE     ?  CREATE TABLE public.food (
    food_id integer NOT NULL,
    food_name character varying,
    carbs numeric,
    protein numeric,
    fats numeric,
    measurement_type character varying,
    measurement_value numeric,
    CONSTRAINT food_measurement_type_check CHECK (((measurement_type)::text = ANY (ARRAY[('g'::character varying)::text, ('ml'::character varying)::text, ('piece'::character varying)::text])))
);
    DROP TABLE public.food;
       public         heap    postgres    false    6            ?            1259    17075    food_food_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.food_food_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.food_food_id_seq;
       public          postgres    false    6    225            ~           0    0    food_food_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.food_food_id_seq OWNED BY public.food.food_id;
          public          postgres    false    226            ?            1259    17076    sets    TABLE     |  CREATE TABLE public.sets (
    set_number integer NOT NULL,
    exercise_id integer NOT NULL,
    workout_date date NOT NULL,
    user_id integer NOT NULL,
    reps integer,
    weight numeric,
    weight_type character varying,
    CONSTRAINT sets_weight_type_check CHECK (((weight_type)::text = ANY (ARRAY[('kg'::character varying)::text, ('lb'::character varying)::text])))
);
    DROP TABLE public.sets;
       public         heap    postgres    false    6            ?            1259    17082    sets_exercise_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.sets_exercise_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.sets_exercise_id_seq;
       public          postgres    false    6    227                       0    0    sets_exercise_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.sets_exercise_id_seq OWNED BY public.sets.exercise_id;
          public          postgres    false    228            ?            1259    17083    sets_user_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.sets_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.sets_user_id_seq;
       public          postgres    false    6    227            ?           0    0    sets_user_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.sets_user_id_seq OWNED BY public.sets.user_id;
          public          postgres    false    229            ?            1259    17084    users    TABLE       CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying,
    password character varying,
    first_name character varying,
    last_name character varying,
    height numeric,
    height_type character varying,
    weight numeric,
    weight_type character varying,
    gender character varying,
    workout_split integer NOT NULL,
    experience character varying,
    dob date,
    CONSTRAINT users_experience_check CHECK (((experience)::text = ANY (ARRAY[('Beginner'::character varying)::text, ('Intermediate'::character varying)::text, ('Expert'::character varying)::text]))),
    CONSTRAINT users_gender_check CHECK (((gender)::text = ANY (ARRAY[('M'::character varying)::text, ('F'::character varying)::text]))),
    CONSTRAINT users_height_type_check CHECK (((height_type)::text = ANY (ARRAY[('cm'::character varying)::text, ('ft'::character varying)::text]))),
    CONSTRAINT users_weight_type_check CHECK (((weight_type)::text = ANY (ARRAY[('kg'::character varying)::text, ('lb'::character varying)::text])))
);
    DROP TABLE public.users;
       public         heap    postgres    false    6            ?            1259    17093    users_equipment    TABLE     i   CREATE TABLE public.users_equipment (
    equipment_id integer NOT NULL,
    user_id integer NOT NULL
);
 #   DROP TABLE public.users_equipment;
       public         heap    postgres    false    6            ?            1259    17096     users_equipment_equipment_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_equipment_equipment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.users_equipment_equipment_id_seq;
       public          postgres    false    6    231            ?           0    0     users_equipment_equipment_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.users_equipment_equipment_id_seq OWNED BY public.users_equipment.equipment_id;
          public          postgres    false    232            ?            1259    17097    users_equipment_user_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_equipment_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.users_equipment_user_id_seq;
       public          postgres    false    231    6            ?           0    0    users_equipment_user_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.users_equipment_user_id_seq OWNED BY public.users_equipment.user_id;
          public          postgres    false    233            ?            1259    17098    users_user_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    230    6            ?           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    234            ?            1259    17099    users_workout_split_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_workout_split_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.users_workout_split_seq;
       public          postgres    false    230    6            ?           0    0    users_workout_split_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.users_workout_split_seq OWNED BY public.users.workout_split;
          public          postgres    false    235            ?            1259    17100    workout_splits    TABLE     Z  CREATE TABLE public.workout_splits (
    workout_split_id integer NOT NULL,
    workout_name character varying,
    sunday character varying[],
    monday character varying[],
    tuesday character varying[],
    wednesday character varying[],
    thursday character varying[],
    friday character varying[],
    saturday character varying[]
);
 "   DROP TABLE public.workout_splits;
       public         heap    postgres    false    6            ?            1259    17105 #   workout_splits_workout_split_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.workout_splits_workout_split_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.workout_splits_workout_split_id_seq;
       public          postgres    false    6    236            ?           0    0 #   workout_splits_workout_split_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.workout_splits_workout_split_id_seq OWNED BY public.workout_splits.workout_split_id;
          public          postgres    false    237            ?           2604    17106    diary food_id    DEFAULT     n   ALTER TABLE ONLY public.diary ALTER COLUMN food_id SET DEFAULT nextval('public.diary_food_id_seq'::regclass);
 <   ALTER TABLE public.diary ALTER COLUMN food_id DROP DEFAULT;
       public          postgres    false    216    215            ?           2604    17107    diary user_id    DEFAULT     n   ALTER TABLE ONLY public.diary ALTER COLUMN user_id SET DEFAULT nextval('public.diary_user_id_seq'::regclass);
 <   ALTER TABLE public.diary ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    217    215            ?           2604    17108    equipments equipment_id    DEFAULT     ?   ALTER TABLE ONLY public.equipments ALTER COLUMN equipment_id SET DEFAULT nextval('public.equipments_equipment_id_seq'::regclass);
 F   ALTER TABLE public.equipments ALTER COLUMN equipment_id DROP DEFAULT;
       public          postgres    false    219    218            ?           2604    17109    exercises exercise_id    DEFAULT     ~   ALTER TABLE ONLY public.exercises ALTER COLUMN exercise_id SET DEFAULT nextval('public.exercises_exercise_id_seq'::regclass);
 D   ALTER TABLE public.exercises ALTER COLUMN exercise_id DROP DEFAULT;
       public          postgres    false    224    220            ?           2604    17110     exercises_equipments exercise_id    DEFAULT     ?   ALTER TABLE ONLY public.exercises_equipments ALTER COLUMN exercise_id SET DEFAULT nextval('public.exercises_equipments_exercise_id_seq'::regclass);
 O   ALTER TABLE public.exercises_equipments ALTER COLUMN exercise_id DROP DEFAULT;
       public          postgres    false    223    221            ?           2604    17111 !   exercises_equipments equipment_id    DEFAULT     ?   ALTER TABLE ONLY public.exercises_equipments ALTER COLUMN equipment_id SET DEFAULT nextval('public.exercises_equipments_equipment_id_seq'::regclass);
 P   ALTER TABLE public.exercises_equipments ALTER COLUMN equipment_id DROP DEFAULT;
       public          postgres    false    222    221            ?           2604    17112    food food_id    DEFAULT     l   ALTER TABLE ONLY public.food ALTER COLUMN food_id SET DEFAULT nextval('public.food_food_id_seq'::regclass);
 ;   ALTER TABLE public.food ALTER COLUMN food_id DROP DEFAULT;
       public          postgres    false    226    225            ?           2604    17113    sets exercise_id    DEFAULT     t   ALTER TABLE ONLY public.sets ALTER COLUMN exercise_id SET DEFAULT nextval('public.sets_exercise_id_seq'::regclass);
 ?   ALTER TABLE public.sets ALTER COLUMN exercise_id DROP DEFAULT;
       public          postgres    false    228    227            ?           2604    17114    sets user_id    DEFAULT     l   ALTER TABLE ONLY public.sets ALTER COLUMN user_id SET DEFAULT nextval('public.sets_user_id_seq'::regclass);
 ;   ALTER TABLE public.sets ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    229    227            ?           2604    17115    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    234    230            ?           2604    17116    users workout_split    DEFAULT     z   ALTER TABLE ONLY public.users ALTER COLUMN workout_split SET DEFAULT nextval('public.users_workout_split_seq'::regclass);
 B   ALTER TABLE public.users ALTER COLUMN workout_split DROP DEFAULT;
       public          postgres    false    235    230            ?           2604    17117    users_equipment equipment_id    DEFAULT     ?   ALTER TABLE ONLY public.users_equipment ALTER COLUMN equipment_id SET DEFAULT nextval('public.users_equipment_equipment_id_seq'::regclass);
 K   ALTER TABLE public.users_equipment ALTER COLUMN equipment_id DROP DEFAULT;
       public          postgres    false    232    231            ?           2604    17118    users_equipment user_id    DEFAULT     ?   ALTER TABLE ONLY public.users_equipment ALTER COLUMN user_id SET DEFAULT nextval('public.users_equipment_user_id_seq'::regclass);
 F   ALTER TABLE public.users_equipment ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    233    231            ?           2604    17119    workout_splits workout_split_id    DEFAULT     ?   ALTER TABLE ONLY public.workout_splits ALTER COLUMN workout_split_id SET DEFAULT nextval('public.workout_splits_workout_split_id_seq'::regclass);
 N   ALTER TABLE public.workout_splits ALTER COLUMN workout_split_id DROP DEFAULT;
       public          postgres    false    237    236            W          0    17044    diary 
   TABLE DATA           R   COPY public.diary (food_id, user_id, created, diary_type, multiplier) FROM stdin;
    public          postgres    false    215   ?~       Z          0    17052 
   equipments 
   TABLE DATA           G   COPY public.equipments (equipment_id, equipment_name, img) FROM stdin;
    public          postgres    false    218   ?~       \          0    17058 	   exercises 
   TABLE DATA           L   COPY public.exercises (exercise_id, exercise_name, target, gif) FROM stdin;
    public          postgres    false    220   R       ]          0    17063    exercises_equipments 
   TABLE DATA           I   COPY public.exercises_equipments (exercise_id, equipment_id) FROM stdin;
    public          postgres    false    221   ?       a          0    17069    food 
   TABLE DATA           m   COPY public.food (food_id, food_name, carbs, protein, fats, measurement_type, measurement_value) FROM stdin;
    public          postgres    false    225   ?       c          0    17076    sets 
   TABLE DATA           i   COPY public.sets (set_number, exercise_id, workout_date, user_id, reps, weight, weight_type) FROM stdin;
    public          postgres    false    227   M?       f          0    17084    users 
   TABLE DATA           ?   COPY public.users (user_id, email, password, first_name, last_name, height, height_type, weight, weight_type, gender, workout_split, experience, dob) FROM stdin;
    public          postgres    false    230   j?       g          0    17093    users_equipment 
   TABLE DATA           @   COPY public.users_equipment (equipment_id, user_id) FROM stdin;
    public          postgres    false    231   ?       l          0    17100    workout_splits 
   TABLE DATA           ?   COPY public.workout_splits (workout_split_id, workout_name, sunday, monday, tuesday, wednesday, thursday, friday, saturday) FROM stdin;
    public          postgres    false    236   $?       ?           0    0    diary_food_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.diary_food_id_seq', 1, false);
          public          postgres    false    216            ?           0    0    diary_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.diary_user_id_seq', 1, false);
          public          postgres    false    217            ?           0    0    equipments_equipment_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.equipments_equipment_id_seq', 2, true);
          public          postgres    false    219            ?           0    0 %   exercises_equipments_equipment_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.exercises_equipments_equipment_id_seq', 1, false);
          public          postgres    false    222            ?           0    0 $   exercises_equipments_exercise_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.exercises_equipments_exercise_id_seq', 1, false);
          public          postgres    false    223            ?           0    0    exercises_exercise_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.exercises_exercise_id_seq', 2, true);
          public          postgres    false    224            ?           0    0    food_food_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.food_food_id_seq', 1, true);
          public          postgres    false    226            ?           0    0    sets_exercise_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.sets_exercise_id_seq', 1, false);
          public          postgres    false    228            ?           0    0    sets_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.sets_user_id_seq', 1, false);
          public          postgres    false    229            ?           0    0     users_equipment_equipment_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.users_equipment_equipment_id_seq', 1, false);
          public          postgres    false    232            ?           0    0    users_equipment_user_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.users_equipment_user_id_seq', 1, false);
          public          postgres    false    233            ?           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);
          public          postgres    false    234            ?           0    0    users_workout_split_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.users_workout_split_seq', 1, false);
          public          postgres    false    235            ?           0    0 #   workout_splits_workout_split_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.workout_splits_workout_split_id_seq', 1, true);
          public          postgres    false    237            ?           2606    17121    diary diary_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.diary
    ADD CONSTRAINT diary_pkey PRIMARY KEY (food_id, user_id, created, diary_type);
 :   ALTER TABLE ONLY public.diary DROP CONSTRAINT diary_pkey;
       public            postgres    false    215    215    215    215            ?           2606    17123 (   equipments equipments_equipment_name_key 
   CONSTRAINT     m   ALTER TABLE ONLY public.equipments
    ADD CONSTRAINT equipments_equipment_name_key UNIQUE (equipment_name);
 R   ALTER TABLE ONLY public.equipments DROP CONSTRAINT equipments_equipment_name_key;
       public            postgres    false    218            ?           2606    17125    equipments equipments_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.equipments
    ADD CONSTRAINT equipments_pkey PRIMARY KEY (equipment_id);
 D   ALTER TABLE ONLY public.equipments DROP CONSTRAINT equipments_pkey;
       public            postgres    false    218            ?           2606    17127 .   exercises_equipments exercises_equipments_pkey 
   CONSTRAINT     ?   ALTER TABLE ONLY public.exercises_equipments
    ADD CONSTRAINT exercises_equipments_pkey PRIMARY KEY (exercise_id, equipment_id);
 X   ALTER TABLE ONLY public.exercises_equipments DROP CONSTRAINT exercises_equipments_pkey;
       public            postgres    false    221    221            ?           2606    17129 %   exercises exercises_exercise_name_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_exercise_name_key UNIQUE (exercise_name);
 O   ALTER TABLE ONLY public.exercises DROP CONSTRAINT exercises_exercise_name_key;
       public            postgres    false    220            ?           2606    17131    exercises exercises_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_pkey PRIMARY KEY (exercise_id);
 B   ALTER TABLE ONLY public.exercises DROP CONSTRAINT exercises_pkey;
       public            postgres    false    220            ?           2606    17133    food food_food_name_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.food
    ADD CONSTRAINT food_food_name_key UNIQUE (food_name);
 A   ALTER TABLE ONLY public.food DROP CONSTRAINT food_food_name_key;
       public            postgres    false    225            ?           2606    17135    food food_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.food
    ADD CONSTRAINT food_pkey PRIMARY KEY (food_id);
 8   ALTER TABLE ONLY public.food DROP CONSTRAINT food_pkey;
       public            postgres    false    225            ?           2606    17137    sets sets_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_pkey PRIMARY KEY (set_number, exercise_id, workout_date, user_id);
 8   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_pkey;
       public            postgres    false    227    227    227    227            ?           2606    17139    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    230            ?           2606    17141 $   users_equipment users_equipment_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.users_equipment
    ADD CONSTRAINT users_equipment_pkey PRIMARY KEY (equipment_id, user_id);
 N   ALTER TABLE ONLY public.users_equipment DROP CONSTRAINT users_equipment_pkey;
       public            postgres    false    231    231            ?           2606    17143    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    230            ?           2606    17145 "   workout_splits workout_splits_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.workout_splits
    ADD CONSTRAINT workout_splits_pkey PRIMARY KEY (workout_split_id);
 L   ALTER TABLE ONLY public.workout_splits DROP CONSTRAINT workout_splits_pkey;
       public            postgres    false    236            ?           2606    17147 .   workout_splits workout_splits_workout_name_key 
   CONSTRAINT     q   ALTER TABLE ONLY public.workout_splits
    ADD CONSTRAINT workout_splits_workout_name_key UNIQUE (workout_name);
 X   ALTER TABLE ONLY public.workout_splits DROP CONSTRAINT workout_splits_workout_name_key;
       public            postgres    false    236            ?           2606    17148 ;   exercises_equipments exercises_equipments_equipment_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.exercises_equipments
    ADD CONSTRAINT exercises_equipments_equipment_id_fkey FOREIGN KEY (equipment_id) REFERENCES public.equipments(equipment_id) ON DELETE CASCADE;
 e   ALTER TABLE ONLY public.exercises_equipments DROP CONSTRAINT exercises_equipments_equipment_id_fkey;
       public          postgres    false    221    3245    218            ?           2606    17153 :   exercises_equipments exercises_equipments_exercise_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.exercises_equipments
    ADD CONSTRAINT exercises_equipments_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercises(exercise_id) ON DELETE CASCADE;
 d   ALTER TABLE ONLY public.exercises_equipments DROP CONSTRAINT exercises_equipments_exercise_id_fkey;
       public          postgres    false    220    3249    221            ?           2606    17158    sets sets_exercise_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercises(exercise_id) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_exercise_id_fkey;
       public          postgres    false    220    227    3249            ?           2606    17163 1   users_equipment users_equipment_equipment_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.users_equipment
    ADD CONSTRAINT users_equipment_equipment_id_fkey FOREIGN KEY (equipment_id) REFERENCES public.equipments(equipment_id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.users_equipment DROP CONSTRAINT users_equipment_equipment_id_fkey;
       public          postgres    false    3245    218    231            ?           2606    17168    users users_workout_split_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_workout_split_fkey FOREIGN KEY (workout_split) REFERENCES public.workout_splits(workout_split_id);
 H   ALTER TABLE ONLY public.users DROP CONSTRAINT users_workout_split_fkey;
       public          postgres    false    236    230    3265            W   (   x?3?4?4202?50?5??t*JM?NK,.?4?????? n?      Z   K   x?3???K???KUpJ?K???())(???O?,?˩?7.sL?0??2?tJ,JJ??Qp?I,??6?+??$?+F??? ?e?      \   ?   x???A
?0E??)r?&??\Z?ܸpӦC?LBg*z{[?????x?SyL?䣹.???,?/???fE*??c%y˲ ?/@?Kv)??%?u7???~?f??M??M׶?{??A?G??yJb?????m????y?@o      ]      x?3?4?2?4?????? ??      a   '   x?3?tMO?4?3?4?3?4ѳ?,?LMN?4?????? e?'      c      x?????? ? ?      f   ?   x??M?  ?????:???ub?
??St?͙??J?h???A(&???y֥ Th????1?iy6??V?Z?w?$>?V?>6?[?o?????~:??:???b\L??Psx[P?p??|???.??B^	$F?q(I      g      x?3?4?2?=... ??      l   F   x?3????v?H-.?	??/?II-*?	)?LN-(???vJL??q??|RӋu?@? ??Z2tr??qqq ?)?     