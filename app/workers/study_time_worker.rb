class StudyTimeWorker
  include Sidekiq::Worker

  def perform(notification_hsh, user_id)
    user = User.find(user_id)
    return unless user.send_notifications?

    Webpush.payload_send(
      message: notification_hsh['message'],
      endpoint: notification_hsh['subscription']['endpoint'],
      p256dh: notification_hsh['subscription']['keys']['p256dh'],
      auth: notification_hsh['subscription']['keys']['auth'],
      vapid: {
        subject: 'mailto:sender@example.com',
        public_key: ENV['VAPID_PUBLIC_KEY'],
        private_key: ENV['VAPID_PRIVATE_KEY']
      }
    )
    # Enqueue next notifcation for the user whose notification was just sent
    duration = [*10..90].sample.seconds # Randomly assign a duration for purposes of demo
    job_id = StudyTimeWorker.perform_in(duration, notification_hsh, user.id)
    user.update_attribute(:current_jid, job_id)
  end
end
