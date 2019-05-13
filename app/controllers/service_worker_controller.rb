class ServiceWorkerController < ApplicationController
  protect_from_forgery except: [:service_worker, :push]

  def service_worker
    redirect_to flashcards_url
  end

  def manifest
    redirect_to flashcards_url
  end

  def push
    Webpush.payload_send(
      message: params[:message],
      endpoint: params[:subscription][:endpoint],
      p256dh: params[:subscription][:keys][:p256dh],
      auth: params[:subscription][:keys][:auth],
      # ttl: 24 * 60 * 60,
      vapid: {
        subject: 'mailto:sender@example.com',
        public_key: ENV['VAPID_PUBLIC_KEY'],
        private_key: ENV['VAPID_PRIVATE_KEY']
      }
    )

    head :no_content
  end
end
