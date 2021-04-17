<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        \App\Role::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $roles = ['Travels and Experiences', 'Commercial Projects','Personal Projects'];
        foreach ($roles as $role) {
            Portfolio::create(['string'=>$role]);
        }
    }
}
