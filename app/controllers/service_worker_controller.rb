class ServiceWorkerController < ApplicationController
  protect_from_forgery except: [:service_worker, :push]

  def service_worker
  end

  def manifest
  end

  def send_push
    duration = [*1..5].sample.minutes # Randomly assign a duration for purposes of demo
    StudyTimeWorker.perform_in(duration, notification_params.to_h)

    head :no_content
  end

  def stop_push
    Sidekiq::Queue.new.clear

    head :no_content
  end

  private

  def notification_params
    params.permit(:message, subscription: [:endpoint, keys: [:p256dh, :auth]])
  end
end
