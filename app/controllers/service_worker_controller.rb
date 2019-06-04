require 'sidekiq/api'

class ServiceWorkerController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery except: [:service_worker, :send_push, :stop_push]

  def service_worker
  end

  def manifest
  end

  def send_push
    duration = [*10..60].sample.seconds # Randomly assign a duration for purposes of demo
    job_id = StudyTimeWorker.perform_in(duration, notification_params.to_h, current_user.id)
    current_user.update(current_jid: job_id, send_notifications: true)

    head :no_content
  end

  def stop_push
    queue = Sidekiq::Queue.new
    queue.each do |job|
      job.delete if job.jid == current_user.current_jid
    end
    current_user.update(current_jid: nil, send_notifications: false)

    head :no_content
  end

  private

  def notification_params
    params.permit(:message, subscription: [:endpoint, keys: [:p256dh, :auth]])
  end
end
