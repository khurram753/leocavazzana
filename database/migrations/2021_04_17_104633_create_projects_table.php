<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('portfolio_id');
            $table->foreign('portfolio_id')->references('id')->on('portfolio')
                ->onDelete('cascade');

            $table->string('name_english')->nullable();
            $table->string('name_russia')->nullable();
            $table->string('name_english')->nullable();

            $table->string('featured_image')->nullable();

            $table->text('description_english')->nullable();
            $table->text('description_french')->nullable();
            $table->text('description_russia')->nullable();


            $table->string('date');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
