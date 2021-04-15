<?php

namespace Database\Seeders;

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            User::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $users = [
            ['name' => 'Admin', 'email' => 'admin@gmail.com',
                'password' => Hash::make('11223344'), 'role_id' => 1],

        ];

        foreach ($users as $user) {

            User::create($user);

        }
    }
}
