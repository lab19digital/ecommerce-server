<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Password;
use Lab19\Cart\Models\Passwords;
use Lab19\Cart\Models\User;
use Lab19\Cart\Notifications\GernzyResetPassword;
use Lab19\Cart\Testing\TestCase;
use Notification;

class PasswordResetTest extends TestCase
{
    use WithFaker;

    public function setUp(): void
    {
        parent::setUp();
        Notification::fake();
    }


    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testResetEmailAndTokenNotificationLaravel()
    {
        // Create user
        $user = factory(User::class)->create();

        // $user = User::where('email', request()->input('email'))->first();
        $token = Password::broker()->createToken($user);

        Passwords::create([
            'email' => $user->email,
            'token' => $token,
            'created_at' => Carbon::now(),
        ]);


        $this->assertDatabaseHas('cart_password_resets', [
            'email' => $user->email,
            'token' => $token,
        ]);


        $user->notify(new GernzyResetPassword($token));

        Notification::assertSentTo(
            $user,
            GernzyResetPassword::class,
            function ($notification, $channels) use ($token, $user) {
                // retrive the mail content
                $mailData = $notification->toMail($user)->toArray();
                print $mailData['actionUrl'];
                $this->assertEquals(route('password.reset.token', ['token' => $notification->getToken()]), $mailData['actionUrl']);
                return $token == $notification->getToken();
            }
        );
    }


    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testResetEmailAndTokenNotificationGraphQl()
    {
        // Create user
        $user = factory(User::class)->create();

        /** @var \Illuminate\Foundation\Testing\TestResponse $response */
        $response = $this->graphQLWithSession('
        mutation {
            resetUserPassword(email: "' . $user->email . '") {
                success
            }
        }
        ');

        $result = $response->decodeResponseJson();

        $response->assertDontSee('errors');

        $response->assertJsonStructure([
            'data' => [
                'resetUserPassword' => [
                    'success'
                ]
            ]
        ]);

        $result = $response->decodeResponseJson();

        $this->assertEquals($result['data']['resetUserPassword']['success'], true);

        $this->assertDatabaseHas('cart_password_resets', [
            'email' => $user->email
        ]);

        Notification::assertSentTo(
            $user,
            GernzyResetPassword::class
        );
    }



    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testResetEmailAndTokenNotificationGraphQlPasswordMatch()
    {
        // Create user
        $user = factory(User::class)->create([
            'password' => bcrypt('secret'),
        ]);

        
        /** @var \Illuminate\Foundation\Testing\TestResponse $response */
        $response = $this->graphQLWithSession('
        mutation {
            resetUserPassword(email: "' . $user->email . '") {
                success
            }
        }
        ');

        $result = $response->decodeResponseJson();

        $response->assertDontSee('errors');

        $response->assertJsonStructure([
            'data' => [
                'resetUserPassword' => [
                    'success'
                ]
            ]
        ]);

        $result = $response->decodeResponseJson();

        $this->assertEquals($result['data']['resetUserPassword']['success'], true);

        $this->assertDatabaseHas('cart_password_resets', [
            'email' => $user->email
        ]);
        
        Notification::assertSentTo(
            $user,
            GernzyResetPassword::class
        );
    }
}
