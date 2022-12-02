<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $users = User::where('state', '!=', 'delete')->pluck('id')->toArray();
        $k = array_rand($users);
        $v = $users[$k];
        return [
            'title' => $this->faker->name(),
            'description' => $this->faker->name(),
            'user_id' => $v,
        ];
    }
}
