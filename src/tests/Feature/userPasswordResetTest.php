<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Lab19\Cart\Models\PasswordResets;
use Lab19\Cart\Models\User;
use Lab19\Cart\Notifications\GernzyResetPassword;
use Lab19\Cart\Testing\TestCase;
use Notification;

class PasswordResetTest extends TestCase
{
    use WithFaker;
    const USER_ORIGINAL_PASSWORD = 'secret';

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
        $tokenHash = Hash::make($token);
        PasswordResets::create([
            'email' => $user->email,
            'token' => $tokenHash,
            'created_at' => Carbon::now(),
        ]);


        $this->assertDatabaseHas('cart_password_resets', [
            'email' => $user->email,
            'token' => $tokenHash,
        ]);


        $user->notify(new GernzyResetPassword($token));

        Notification::assertSentTo(
            $user,
            GernzyResetPassword::class,
            function ($notification, $channels) use ($token, $user) {
                // retrive the mail content
                $mailData = $notification->toMail($user)->toArray();
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
            resetUserPasswordLink(email: "' . $user->email . '") {
                success
            }
        }
        ');

        $result = $response->decodeResponseJson();

        $response->assertDontSee('errors');

        $response->assertJsonStructure([
            'data' => [
                'resetUserPasswordLink' => [
                    'success'
                ]
            ]
        ]);

        $result = $response->decodeResponseJson();

        $this->assertEquals($result['data']['resetUserPasswordLink']['success'], true);

        $this->assertDatabaseHas('cart_password_resets', [
            'email' => $user->email
        ]);

        Notification::assertSentTo(
            $user,
            GernzyResetPassword::class
        );
    }



    /**
     * Testing submitting the password reset page.
     */
    public function testSubmitPasswordReset()
    {
        $user = factory(User::class)->create([
            'password' => bcrypt(self::USER_ORIGINAL_PASSWORD)
        ]);

        $token = Password::broker()->createToken($user);

        PasswordResets::create([
            'email' => $user->email,
            'token' => Hash::make($token),
            'created_at' => Carbon::now(),
        ]);

        $password = str_random();

        $this
            ->post(route('password.reset'), [
                'token' => $token,
                'email' => $user->email,
                'password' => $password,
                'password_confirmation' => $password,
            ])
            ->assertSuccessful();

        $user->refresh();

        $this->assertFalse(Hash::check(
            self::USER_ORIGINAL_PASSWORD,
            $user->password
        ));

        $this->assertTrue(Hash::check($password, $user->password));
    }
}
