<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('test_create')->insert(
            [
                [
                    'first_name' => 'Huub',
                    'last_name' => 'Dorgelo',
                    'job_title' => 'Software Engineer',
                ],
                [
                    'first_name' => 'Henk',
                    'last_name' => 'Janssen',
                    'job_title' => 'Fietser',
                ],
                [
                    'first_name' => 'Jop',
                    'last_name' => 'Wolterink',
                    'job_title' => 'Software Meneer',
                ],
                [
                    'first_name' => 'Freek',
                    'last_name' => 'Vonk',
                    'job_title' => 'Dier',
                ],
                [
                    'first_name' => 'Wessel',
                    'last_name' => 'Bekken',
                    'job_title' => 'Programmeur',
                ],
            ]
        );
    }
}
