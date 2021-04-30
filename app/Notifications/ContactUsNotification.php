<?php

namespace App\Notifications;

use App\ContactUs;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactUsNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */

    private $contactUs;

    public function __construct($contactUs)
    {
        //
        $this->contactUs = $contactUs;

    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
//        dd($this->contactUs['email'],$this->contactUs['phone'],$this->contactUs['message']);
        return (new MailMessage)
            ->from($this->contactUs['email'])
            ->line('Company:'.$this->contactUs['company'])
            ->line('PhoneNumber: '.$this->contactUs['phone'])
            ->line($this->contactUs['message']);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
