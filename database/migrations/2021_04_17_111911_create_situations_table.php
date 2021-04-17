<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSituationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('situations', function (Blueprint $table) {
            $table->id();

            $table->string('title_english')->nullable();
            $table->string('title_russia')->nullable();
            $table->string('title_french')->nullable();

            $table->string('date')->nullable();

            $table->string('tag_line_english')->nullable();
            $table->string('tag_line_russia')->nullable();
            $table->string('tag_line_french')->nullable();

            $table->text('description_english')->nullable();
            $table->text('description_russia')->nullable();
            $table->text('description_french')->nullable();

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
        Schema::dropIfExists('situations');
    }
}
