<?php

namespace Database\Seeders;

use App\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        \App\Role::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');


        $roles = ['Admin', 'User'];
        foreach ($roles as $role) {
           Role::create(['name'=>$role]);
        }
    }
}
